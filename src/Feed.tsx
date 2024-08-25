import React from "react";
import { formatDate, getTimeAgo } from "./datetime.ts";

export function FeedEntry({ item }: any) {
  console.log("item", item);
  const { image, date_published } = item;
  const author = item.authors?.[0]?.name ?? "Unknown author";
  let content = item.title;
  const contentPrefix = `${author}: `;
  if (content.startsWith(contentPrefix)) {
    content = content.slice(contentPrefix.length);
  }
  const date = formatDate(date_published);
  const timeAgo = getTimeAgo(date_published);
  return (
    <div className="grid border border-gray-300 shadow-xl rounded-xl bg-white">
      <div className="flex items-baseline justify-between gap-0.5 px-4 py-2">
        <div className="text-base font-semibold">{author}</div>
        <div className="text-sm text-gray-500" title={date}>
          {timeAgo}
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="grid gap-2 p-4">
        <div>{content}</div>
        <img src={image} className="rounded-lg" />
      </div>
    </div>
  );
}

export function Feed() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>();
  const [data, setData] = React.useState<any>();
  React.useEffect(() => {
    fetch("https://rss.app/feeds/v1.1/CFwqcPjmlIGwC6y4.json")
      .then((res: Response) => res.json())
      .catch((error: Error) => {
        setError(error.message);
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <>Loading…</>;
  }
  if (error) {
    return <>{error}</>;
  }
  const title = data.title.split(" / ")[0];
  return (
    <>
      <div className="bg-gray-100/85 backdrop-blur-sm sticky top-0 mb-0">
        <h1
          className="container px-4 mx-auto max-w-lg py-3 flex items-center font-bold text-lg sm:text-xl md:text-2xl"
          title={title}
        >
          <div className="select-none inline-grid mr-2 place-items-center bg-black aspect-square w-9 text-white text-2xl leading-none pb-px rounded-full">
            <span>𝕏</span>
          </div>
          {title}
        </h1>
      </div>
      <div className="container px-4 mx-auto max-w-lg pb-6 grid gap-5">
        {data.items.map((item: any) => {
          return <FeedEntry item={item} />;
        })}
      </div>
    </>
  );
}
