import Task from 'data.task';
import { compose, map, prop, pick, over, lensProp, head, keys, split } from 'ramda';

// PURE LIBS

const log = (x) => { console.log(x); return x; };

// get :: Url -> Task Error JSON
const getRequest = url => new Task((rej, res) => {
  fetch(url).then((resp) => {
    if (!resp.ok) throw new Error('something wrong');
    return resp.json();
  }).then(res).catch(() => rej('not found'));
});

// url :: String -> Url
const makeUrl = language => `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`;

const makeDate = compose(head, split('T'));

const dateFilter = over(lensProp('created_at'), makeDate);

const ownerFilter = over(lensProp('owner'), prop('login'));

const makeItems = compose(
  map(compose(dateFilter, ownerFilter, pick(['name', 'owner', 'description', 'created_at', 'stargazers_count']))), prop('items')
);

// getItemProperties :: [Item] => [ItemProperties]
const getItemProperties = compose(map(k => ((k === 'stargazers_count') ? 'stars' : k)), keys, head);

const ghTrendSearch = compose(map(makeItems), getRequest, makeUrl);

export { log, ghTrendSearch, getItemProperties };
