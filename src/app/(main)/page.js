
import AITips from "@/component/AITips";
import Banner from "@/component/Banner";
import CustomerReviews from "@/component/CustomerReviews";
import FeaturedPrompts from "@/component/FeaturedPrompts";
import HowItWorks from "@/component/HowItWorks";
import TestPage from "@/component/Test";
import TopCreators from "@/component/TopCreators";
import WhyChooseUs from "@/component/WhyChooseUs";
import Image from "next/image";

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/featured-prompts`,
    {
      cache: "no-store",
    }
  );

  const prompts = await res.json();
  console.log(prompts);
  const creatorRes = await fetch(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/top-creators`,
  {
    cache: "no-store",
  }
);

const creators = await creatorRes.json();

const reviewRes = await fetch(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/customer-reviews`,
  {
    cache: "no-store",
  }
);

const reviews = await reviewRes.json();

  return (
    <>
      <Banner></Banner>
      <FeaturedPrompts prompts={prompts}></FeaturedPrompts>
      <WhyChooseUs></WhyChooseUs>
      <TopCreators creators={creators} />
      <CustomerReviews reviews={reviews} />
      <HowItWorks />
      <AITips />
    </>
  );
}
