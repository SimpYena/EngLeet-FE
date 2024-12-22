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

const createQuiz = async (quiz): Promise<any> => {
  if (quiz.type === "Reading") {
    return UserApi.createReadingQuiz(quiz);
  }

  if (quiz.type === "Listening") {
    return UserApi.createListeningQuiz(quiz);
  }

  return;
}

const createTest = async (test): Promise<any> => {
  return UserApi.createTest(test)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

const createSection = async (section): Promise<any> => {
  return UserApi.createSection(section)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

const createSectionContext = async (sectionContext): Promise<any> => {
  return UserApi.createSectionContext(sectionContext)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

const addQuestion = async (question): Promise<any> => {
  return UserApi.addQuestion(question)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

const getNewestTest = async (): Promise<any> => {
  return UserApi.getNewestTest()
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export default {
  getSubmitedTest,
  generateTest,
  generateAssessmentTest,
  generateReadingTest,
  generateListeningTest,
  getReadingTest,
  getListeningTest,
  getGeneratedTest,
  createQuiz,
  createTest,
  createSection,
  createSectionContext,
  addQuestion,
  getNewestTest
};
