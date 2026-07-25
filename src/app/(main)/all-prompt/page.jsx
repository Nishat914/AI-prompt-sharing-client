import { Avatar, Button, Card, Input } from "@heroui/react";
import Link from "next/link";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

export const metadata = {
  title: "APSM - all-prompt",
};

const AllPromptPage = async ({ searchParams }) => {
  const params = await searchParams;

  const search = params?.search || "";
  const category = params?.category || "";

  const query = new URLSearchParams();

  if (search) query.append("search", search);
  if (category) query.append("category", category);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/prompts?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  const promts = await res.json();

  return (
    <>
      {/* Search + Filter */}
      <div className="container mx-auto w-[80%] mt-10 flex flex-col md:flex-row justify-between gap-4">
  
        {/* Search */}
        <form action="/all-prompt" className="flex gap-3 w-full md:w-1/2">
            <Input
            name="search"
            placeholder="Search ideas by title..."
            defaultValue={search}
            className="flex-1 bg-[#f3ece6]"
            />

            <Button
            type="submit"
            className="bg-[#6F5B50] text-white px-6"
            >
            Search
            </Button>

            <Link href="/all-prompt">
            <Button className="bg-[#6F5B50] text-white px-6">
                Reset
            </Button>
            </Link>
        </form>

        {/* Filter */}
        <form action="/all-prompt" className="flex justify-center items-center gap-3 w-full md:w-auto">
            <select
            name="category"
            defaultValue={category}
            className=" rounded-xl px-4 py-3 bg-[#f3ece6] min-w-50 text-mauve-600 "
            >
            <option value="">All Categories</option>
            <option value="Writing">Writing</option>
            <option value="Programming">Programming</option>
            <option value="Marketing">Marketing</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
            <option value="Design">Design</option>
            <option value="Productivity">Productivity</option>
            <option value="Other">Other</option>
            </select>

            <Button
            type="submit"
            className="bg-[#6F5B50] text-white px-6"
            >
            Filter
            </Button>
        </form>
        </div>

      {/* Ideas */}
      <div className="container mx-auto w-[80%] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
        {promts.length > 0 ? (
          promts.map((promt) => (
            <Card
              key={promt._id}
              className="bg-linear-to-t from-[#f3ece6]  to-[#f5e5d8]"
            >
              <img
                alt={promt.title}
                className="pointer-events-none aspect-square w-14 rounded-2xl object-cover select-none"
                loading="lazy"
                src={promt.image}
              />

              <Card.Header>
                <Card.Title className="[#6F5B50]">
                  {promt.title}
                </Card.Title>
                <Card.Description>
                  category : {promt.category}
                </Card.Description>
              </Card.Header>

              <Card.Footer className="flex flex-col gap-2">
                

                <span className="text-xs text-[#6F5B50] ">
                  AI Tool : {promt.aiTool}
                </span>
                <span className="text-xs text-[#6F5B50]">
                  Copy Count : {promt.copyCount}
                </span>
                <span className="text-xs text-[#6F5B50]">
                 Creator Name : {promt.creatorName}
                </span>
              </Card.Footer>

              <Link href={`/prompt-details/${promt._id}`}>
                <Button className="w-full bg-[#6F5B50] text-white text-sm">
                  View Details <LuSquareArrowOutUpRight />
                </Button>
              </Link>
            </Card>
          ))
        ) : (
          <p className="text-center col-span-full text-xl text-mauve-600">
            No Promts found
          </p>
        )}
      </div>
    </>
  );
};

export default AllPromptPage;