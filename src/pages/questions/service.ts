import request from '@/utils/request';

export async function getQuestions() {
    return request(`${API}/collection/Question?page=0&sort=lastModifiedDate&order=DESC`, {
        method: 'GET',
        headers: {
            'jrc-domain': 'fragma.justrocket.cloud',
        },
    });
}

export async function postQuestion(question) {
    return request(`${API}/collection/Question`, {
        method: 'POST',
        headers: {
            'jrc-domain': 'fragma.justrocket.cloud',
        },
        data: question,
    });
}