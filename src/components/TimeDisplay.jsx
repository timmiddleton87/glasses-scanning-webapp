import Moment from "react-moment";

export const LiveTime = () => {
  return <Moment element="h4" format="HH:mm:ss" interval={1000} />;
};

export const DateToday = () => {
  const d = new Date(Date.now());

  //    // This bit formats the date differently - maybe useful?!

  //     var options = { month: "short" };

  //     const m = new Intl.DateTimeFormat("en-US", options).format(d);

  //     const dateToday = [m, d.getDate(), d.getFullYear()];

  return <p>{d.toDateString()}</p>;
};

export function getCurrentDate(separator = "-") {
  let newDate = new Date();
  let date = String(newDate.getDate()).padStart(2, "0");
  let monthcount = newDate.getMonth() + 1;
  let month = String(monthcount).padStart(2, "0");
  let year = newDate.getFullYear();

  let outputstring = `${year}${separator}${month}${separator}${date}`;

  console.log("OUTPUTSTRING: ", outputstring);

  return outputstring;
}
