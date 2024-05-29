// @ts-nocheck
const getRating = (item, teacher, exercise, conspectus) => {
  let rating =
    Object.values(item.options ? item.options : item)
      .filter((element) => element !== 'н')
      .reduce((sum, element) => sum + parseInt(element), 0) +
    parseInt(teacher) +
    parseInt(exercise) +
    parseInt(conspectus);
  if (rating > 95) rating = 95;
  return rating;
};
const getExam = (rating, report) => {
  if (report === '+') {
    if (rating > 94) {
      return 'Відмінно';
    } else if (rating < 95 && rating > 84) {
      return 'Дуже добре';
    } else if (rating < 85 && rating > 74) {
      return 'Добре';
    } else if (rating < 75 && rating > 64) {
      return 'Задовільно';
    } else if (rating < 65 && rating > 59) {
      return 'Достатньо';
    } else if (rating < 60) {
      return 'Н/З';
    }
  } else {
    return 'Н/З';
  }
};
const informationUpload = (data, group, getDiscipline) => {
  //Getting all keys and values
  let keys = data.map((item) => {
    return Object.keys(item)[0].split(';');
  });
  let values = data.map((item) => {
    return Object.values(item)[0].split(';');
  });
  //Getting the necessary keys and values
  let newKeys = keys.map(([, surName, , groupName, , , k1, k2, k3, k4, k5, k6, k7, k8, k9, k10, k11, k12, k13, k14, k15, k16]) => {
    return [surName, groupName, k1, k2, k3, k4, k5, k6, k7, k8, k9, k10, k11, k12, k13, k14, k15, k16];
  });
  let newValues = values.map(([, surName, , groupName, , , v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15, v16]) => {
    return [surName, groupName, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15, v16];
  });
  const { name } = getDiscipline;
  if (name === 'Матеріалознавство' || 'СКЖЦВ') {
    keys = newKeys.map(([, , ...item]) => item.filter((item) => item !== undefined).slice(0, 1));
    values = newValues.map(([, , ...item]) => item.filter((item) => item !== undefined).slice(0, 1));
  } else if (name === 'ТКМ') {
    keys = newKeys.map(([, , ...item]) => item.filter((item) => item !== undefined));
    values = newValues.map(([, , ...item]) => item.filter((item) => item !== undefined));
  }
  //Forming numbers of tests
  const numberTests = keys[0].map((item) => {
    let box = item.split('_');
    box = box[1].split(' ');
    return `test_${box[0]}`;
  });
  //Forming the list of tests
  const listTests = values.map((item) => {
    return item.map((item, index) => {
      return {
        [numberTests[index]]: item === '-' ? 'н' : item,
      };
    });
  });
  //Forming the final objects
  values = newValues.map(([surName, groupName]) => [surName, groupName]);
  const uniteObjects = (item) => {
    let box = {};
    item.forEach((item) => {
      box = { ...box, ...item };
    });
    return box;
  };
  newValues = values.map((item, index) => {
    return [...item, uniteObjects(listTests[index])];
  });
  values = newValues.map((item = []) => {
    return {
      surName: item[0],
      group: item[1],
      options: item[2],
      teacher: '',
      conspectus: '',
      exercise: '',
      rating: '',
      report: '',
      exam: 'Н/З',
    };
  });
  return values.filter((item) => item.group === group);
};
module.exports = {
  getRating,
  getExam,
  informationUpload,
};
