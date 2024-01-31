// @ts-nocheck
export const headCells = (dates) => {
  const listDates = JSON.parse(dates?.listDates || '[]').filter((item) => item !== null);
  const tests = listDates.map(([test, date]) => {
    return {
      id: `test_${test}`,
      numeric: true,
      label: `${test}_${date}`,
      date: new Date(date.split('.').reverse().join('.')).getTime(),
    };
  });
  return [
    {
      id: 'surName',
      numeric: true,
      label: 'Прізвище',
    },
    {
      id: 'variant',
      numeric: true,
      label: 'Варіант',
    },
    ...tests.sort((a, b) => (a.date > b.date ? 1 : -1)),
    {
      id: 'report',
      numeric: true,
      label: 'Звіт',
    },
    {
      id: 'teacher',
      numeric: true,
      label: 'Викладач',
    },
    {
      id: 'conspectus',
      numeric: true,
      label: 'Конспект',
    },
    {
      id: 'exercise',
      numeric: true,
      label: 'Завдання',
    },
    {
      id: 'rating',
      numeric: true,
      label: 'Рейтинг',
    },
    {
      id: 'exam',
      numeric: true,
      label: 'Екзамен',
    },
  ];
};
export function createData({ id, surName, variant, report, teacher, conspectus, exercise, rating, exam, options }) {
  return {
    id,
    surName,
    variant,
    ...JSON.parse(options || '{}'),
    report,
    teacher,
    conspectus,
    exercise,
    rating,
    exam,
  };
}
export const showNavigation = (...args) => {
  const [values, setValues, suffixDisciplineURL, suffixGroupURL, name, itemId, disciplineId, idDiscipline, idGroup] = args;
  if (!values.isShowSearchStudent) {
    if (!disciplineId) {
      setValues({
        ...values,
        showNavigationItemDiscipline: true,
        valueNavigationItemDiscipline: name,
        showListItems: true,
        getGroups: true,
        showListStudents: false,
      });
      if (values.showListItems) suffixDisciplineURL.current = itemId;
    } else if (disciplineId) {
      setValues({
        ...values,
        showNavigationItemDiscipline: true,
        showNavigationItemGroup: true,
        valueNavigationItemGroup: name,
        showListItems: false,
        getGroups: false,
        showListStudents: true,
      });
      suffixGroupURL.current = itemId;
    }
  } else {
    setValues({
      ...values,
      showNavigationItemDiscipline: true,
      showNavigationItemGroup: true,
      showListItems: false,
      getGroups: false,
      showListStudents: true,
      valueNavigationItemDiscipline: '',
      valueNavigationItemGroup: '',
    });
    suffixDisciplineURL.current = idDiscipline;
    suffixGroupURL.current = idGroup;
  }
};
