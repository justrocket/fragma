import { Reducer } from 'redux';
import { Effect, router } from 'dva';
import { Question } from './data';
import { getQuestions, postQuestion } from './service';
import { notification } from 'antd';

const Model = {
    namespace: 'questionsModel',

    state: {
        questions: [],
    },

    effects: {
        *loadQuestions({ payload: queryParams }, { put, call }) {
            const response = yield call(getQuestions, queryParams)
            const questions = response.content || [];
            yield put({
                type: 'save',
                payload: {
                    questions,
                }
            });
        },
        *postQuestion({ payload: question }, { put, call }) {
            yield call(postQuestion, question);
            notification.success({ message: "Question asked" });
            yield put({ type: 'questionsModel/loadQuestions' });
        },
    },
    reducers: {
        save(oldState, { payload }) {
            const newState = {
                ...oldState,
                ...payload,
            };
            return newState;
        },
    }

}

export default Model;
