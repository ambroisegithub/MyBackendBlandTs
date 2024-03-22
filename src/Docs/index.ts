
import basicInfo from './basicInfo';
import server from './server';
import tags from './tags';
import component from './components';
import user from './users/';
export default {
    ...basicInfo,
    ...server,
    ...tags,
    ...component,
    ...user
};