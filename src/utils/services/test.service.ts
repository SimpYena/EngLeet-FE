import UserApi from "../apis/user.service";

const getSubmitedTest = async (id): Promise<any> => {
  return UserApi.getSubmitedTest(id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

const generateTest = async (topic, difficulty): Promise<any> => {
  return Promise.all([, UserApi.generateListeningTest(topic, difficulty)]);
};

const generateReadingTest = async (topic, difficulty): Promise<any> => {
  return UserApi.generateReadingTest(topic, difficulty);
};

const generateListeningTest = async (topic, difficulty): Promise<any> => {
  return UserApi.generateListeningTest(topic, difficulty);
};

const generateAssessmentTest = async (): Promise<any> => {
  return UserApi.generateAssessmentTest()
    .then((response) => {
      return response.questions.map((item) => ({
        ...item,
        correctAnswer: item["correct answer"]
      }));
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

const getReadingTest = async (id): Promise<any> => {
  try {
    const ids = id.split("-");
    if (ids[0] === "gr") {
      const response = await UserApi.getGeneratedTest(ids[1]);
      return response.content.sectionContext[0];
    }

    return UserApi.getReadingTestDetail(id)
      .then((response) => {
        return response.items[0].sectionContext[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  } catch (error) {
    console.log(error);
    return  null;
  }
};

const getListeningTest = async (id): Promise<any> => {
  try {
    const ids = id.split("-");
    if (ids[0] === "gl") {
      const response = await UserApi.getGeneratedTest(ids[1]);
      return response.content.sectionContext[0];
    }

    return UserApi.getListeningTestDetail(id)
      .then((response) => {
        return response.items[0].sectionContext[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getGeneratedTest = async (id): Promise<any> => {
  return UserApi.getGeneratedTest(id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export default {
  getSubmitedTest,
  generateTest,
  generateAssessmentTest,
  generateReadingTest,
  generateListeningTest,
  getReadingTest,
  getListeningTest,
  getGeneratedTest
};
