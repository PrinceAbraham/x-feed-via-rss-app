const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function getTimeAgo(datestring: string) {
  const date = new Date(datestring);
  const now = new Date();
  const seconds = Math.floor((+now - +date) / 1000);

  const intervals = [
    { time: 60, label: "seconds" },
    { time: 60, label: "minutes" },
    { time: 24, label: "hours" },
    { time: 7, label: "days" },
    { time: 4.34524, label: "weeks" },
    { time: 12, label: "months" },
    { time: Infinity, label: "years" },
  ];

  let diff = seconds;
  for (let i = 0; i < intervals.length; i++) {
    if (diff < intervals[i].time) {
      return rtf.format(-Math.floor(diff), intervals[i].label);
    }
    diff = diff / intervals[i].time;
  }
}

const dateFormatter = new Intl.DateTimeFormat("en-US");
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

export function formatDate(date: string) {
  const d = dateFormatter.format(new Date(date));
  const t = timeFormatter.format(new Date(date));
  return `${d} @ ${t}`;
}
