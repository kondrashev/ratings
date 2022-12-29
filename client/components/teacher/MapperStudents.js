// @ts-nocheck
export const headCells = (dates) => {
  const listDates = JSON.parse(dates?.listDates || "[]").filter(
    (item) => item !== null
  );
  const tests = listDates.map(([test, date]) => {
    return {
      id: `test_${test}`,
      numeric: true,
      label: `${test}_${date}`,
      date: new Date(date.split(".").reverse().join(".")).getTime(),
    };
  });
  return [
    {
      id: "surName",
      numeric: true,
      label: "Прізвище",
    },
    ...tests.sort((a, b) => (a.date > b.date ? 1 : -1)),
    {
      id: "report",
      numeric: true,
      label: "Звіт",
    },
    {
      id: "teacher",
      numeric: true,
      label: "Викладач",
    },
    {
      id: "conspectus",
      numeric: true,
      label: "Конспект",
    },
    {
      id: "exercise",
      numeric: true,
      label: "Завдання",
    },
    {
      id: "rating",
      numeric: true,
      label: "Рейтинг",
    },
    {
      id: "exam",
      numeric: true,
      label: "Екзамен",
    },
  ];
};
export function createData({
  id,
  surName,
  nameDiscipline,
  report,
  teacher,
  conspectus,
  exercise,
  rating,
  exam,
  options,
}) {
  if (nameDiscipline === "ТКМ") {
    const {
      test_31,
      test_32,
      test_33,
      test_34,
      test_41,
      test_43,
      test_51,
      test_53,
      test_56,
      test_57,
      test_65,
      test_66,
      test_67,
      test_68,
      test_72,
      test_73,
    } = JSON.parse(options || "{}");
    return {
      id,
      surName,
      test_31,
      test_32,
      test_33,
      test_34,
      test_41,
      test_43,
      test_51,
      test_53,
      test_56,
      test_57,
      test_65,
      test_66,
      test_67,
      test_68,
      test_72,
      test_73,
      report,
      teacher,
      conspectus,
      exercise,
      rating,
      exam,
    };
  } else if (nameDiscipline === "Матеріалознавство") {
    const { test_2, test_3, test_4, test_5, test_10, test_12, test_15 } =
      JSON.parse(options || "{}");
    return {
      id,
      surName,
      test_2,
      test_3,
      test_4,
      test_5,
      test_10,
      test_12,
      test_15,
      report,
      teacher,
      conspectus,
      exercise,
      rating,
      exam,
    };
  } else {
    return "{}";
  }
}
export const showNavigation = (...args) => {
  const [
    values,
    setValues,
    suffixDisciplineURL,
    suffixGroupURL,
    name,
    itemId,
    disciplineId,
    idDiscipline,
    idGroup,
  ] = args;
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
      valueNavigationItemDiscipline: "",
      valueNavigationItemGroup: "",
    });
    suffixDisciplineURL.current = idDiscipline;
    suffixGroupURL.current = idGroup;
  }
};
