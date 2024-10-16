import Users from "@/components/home/users/Users";

const page = () => {
  return (
    <main className="text-2xl w-full flex">
      <section className="flex-grow-[6]">Home Feed</section>
      <Users />
    </main>
  );
};

export default page;
