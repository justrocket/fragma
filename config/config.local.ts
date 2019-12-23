import master from './config.master';

const mock = {
    define: {
        API: '/mock/api',
    },
};

export default {
    ...master,
    ...mock, //uncomment this line to work with the mock version
};
