import Moment from "react-moment";

export const LiveTime = () => {
  return <Moment element="h2" format="HH:mm:ss" interval={1000} />;
};

export const DateToday = () => {
  const d = new Date(Date.now());

  //    // This bit formats the date differently - maybe useful?!

  //     var options = { month: "short" };

  //     const m = new Intl.DateTimeFormat("en-US", options).format(d);

  //     const dateToday = [m, d.getDate(), d.getFullYear()];

  return <p>{d.toDateString()}</p>;
};
