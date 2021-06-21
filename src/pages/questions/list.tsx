import React, { Component } from 'react';
import { Button, Card, Form, PageHeader, Input, Divider } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { GridContent } from '@ant-design/pro-layout';
import { Question } from './data';
import moment from 'moment';
import style from './list.less';

const QuestionFormCard = ({ submitFormHandler, cancelHandler }) => {
  return (<Card
    className={style.askForm}
    title="Ask a new question!"
  >
    <Form onSubmit={e => {
      e.preventDefault();
      const formData = Array.prototype.filter.call(e.target.elements, e => e.tagName === 'INPUT')
        .reduce((s, i) => { s[i.id] = i.value; return s; }, {});
      submitFormHandler(formData);
    }}>
      <Form.Item>
        <Input.Group>
          <label htmlFor="title">Question title</label>
          <Input
            name="title"
            id="title"
            placeholder={"Why is the sky blue?"} />
        </Input.Group>
      </Form.Item>
      <div className={style.askFormActions}>
        <Button size='default' type='link' onClick={e => cancelHandler()}>Cancel</Button>
        <Button size={`large`} type='primary' htmlType="submit">Post Question</Button>
      </div>
    </Form>
  </Card>);
};

const QuestionCard = (question: any) => <Card className={style.questionCard}
    title={<h2 className={style.questionTitle}>{question.title}</h2>}
    key={question._id}
    extra={<div className={style.questionExtra}>
      <div className="author">{question.lastModifiedBy}</div>
      <div className="author">{moment(question.lastModified).format('LLL')}</div>
    </div>}
  >
    <div className={style.questionContent}
      dangerouslySetInnerHTML={{ __html: question.text }} />
    <Divider />
    {question.answers && question.answers.length ? <>
      <h3>Answers</h3>
      <ol className={style.answers}>
        {(question.answers || []).map((a, i) => <li className={style.answer} key={a._id || i}>
          <p>{a.createdBy}'s answer:</p>
          <p>
            {a.text}
          </p>
        </li>)}
      </ol>
    </> : <>
      <Button>Answer Question</Button>
    </>}
  </Card>;

class QuestionsList extends Component<{}, {}> {
  constructor(props: any) {
    super(props);
    this.state = {
      showQuestionForm: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: "questionsModel/loadQuestions",
      payload: {},
    });
  }

  showQuestionForm(showQuestionForm: boolean) {
    this.setState({ showQuestionForm });
  }
  render() {
    const { showQuestionForm } = this.state;
    const { questions, dispatch } = this.props;
    return (
      <GridContent>
        <PageHeader
          title="Questions"
          extra={
            <Button size="large" type="primary" icon="plus"
              onClick={() => this.showQuestionForm(true)}
            >
              Ask question
            </Button>
          }
        />
        {showQuestionForm && <QuestionFormCard
          submitFormHandler={data => {
            dispatch({
              type: "questionsModel/postQuestion",
              payload: data,
            });
            this.showQuestionForm(false)
          }}
          cancelHandler={() => this.showQuestionForm(false)} />}
        {questions.map(question =>
          <QuestionCard question={question}/>)
        }

      </GridContent>
    );
  }
}

export default connect(
  ({ questionsModel: { questions } }) => ({ questions: questions }))
  (QuestionsList);

