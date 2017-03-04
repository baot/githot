import Task from 'data.task';
import { compose, map, prop, pick, over, lensProp, head, keys, split, reduce, has } from 'ramda';

// PURE LIBS

const log = (x) => { console.log(x); return x; };

// get :: Url -> Task Error JSON
const getRequest = url => new Task((rej, res) => {
  fetch(url).then((resp) => {
    if (!resp.ok) throw new Error('something wrong');
    return resp.json();
  }).then(res).catch(() => rej('not found'));
});

const searchKeywords = ['in', 'size', 'forks', 'fork', 'created', 'pushed', 'user', 'repo', 'language', 'stars'];

// Convert date to ISO 8601 (YYYY-MM-DD) date string, accounting for current timezone
const formatIso = (date) => {
  return (new Date(`${date.toDateString()} 12:00:00 +0000`)).toISOString().substring(0, 10);
}

// url :: object -> Url
const makeUrl = (options) => {
  const optionsString = reduce(
    (acc, value) => {
      if (has(value)(options)) {
        if (value === 'created' || value === 'pushed') {
          acc += `+${value}:>${formatIso(options[value])}`;
        } else {
          acc += `+${value}:${options[value]}`;
        }
      }
      return acc;
    })('')(searchKeywords);
  return `https://api.github.com/search/repositories?q=${optionsString}&sort=stars&order=desc`;
}

const makeDate = compose(head, split('T'));

const dateFilter = over(lensProp('created_at'), makeDate);

const ownerFilter = over(lensProp('owner'), prop('login'));

const makeItems = compose(
  map(compose(dateFilter, ownerFilter, pick(['name', 'owner', 'description', 'created_at', 'stargazers_count']))), prop('items')
);

// getItemProperties :: [Item] => [ItemProperties]
const getItemProperties = compose(map(k => ((k === 'stargazers_count') ? 'stars' : k)), keys, head);

const ghTrendSearch = compose(map(makeItems), getRequest, log, makeUrl);

export { log, ghTrendSearch, getItemProperties };
