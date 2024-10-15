import Users from "@/components/home/users/Users";

const page = () => {
  return (
    <main className="text-2xl w-full grid grid-cols-2">
      <section>Home Feed</section>
      <Users />
    </main>
  );
};

export default page;
