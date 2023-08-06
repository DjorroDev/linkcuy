import { getAllAccounts, getSelectedAccount } from "@/api/services";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function SlugPage({ data }) {
  //   console.log(data);
  return (
    <main
      className={`flex min-h-screen max-w-2xl m-auto flex-col items-center p-4 pt-24 ${inter.className}`}
    >
      <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden">
        <Image
          className="relative"
          layout="fill"
          objectFit="cover"
          src={`${process.env.NEXT_PUBLIC_ASSET_URL}${data.attributes.photo.data.attributes.url}`}
          alt={data.attributes.fullname}
        ></Image>
      </div>
      <div className="flex flex-col items-center gap-2 w-full mb-12">
        <h3 className="text-2xl font-bold">{data.attributes.fullname}</h3>
        <p className="text-lg">{data.attributes.bio}</p>
      </div>
      <div className="flex flex-col items-center gap-8 w-full">
        {data.attributes.links.data.map((value, index) => {
          let statusClass = "";

          if (value.attributes.status === "active") {
            statusClass = "cursor-pointer";
          } else if (value.attributes.status === "deactive") {
            statusClass = "invisible";
          } else if (value.attributes.status === "suspend") {
            statusClass = "cursor-not-allowed";
          }
          return value.attributes.status === "suspend" ? (
            <div
              key={index}
              className={`h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[24px] p-4 hover:scale-105 transition-all ${statusClass}`}
            >
              {value.attributes.title}
            </div>
          ) : (
            <a
              key={index}
              className={`h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[24px] p-4 hover:scale-105 transition-all ${statusClass}`}
              href={value.attributes.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {value.attributes.title}
            </a>
          );
        })}
      </div>
    </main>
  );
}

export async function getStaticPaths() {
  const accounts = await getAllAccounts();
  const dataAccounts = await accounts.data.data;

  const paths = dataAccounts.map((value) => {
    return {
      params: { slug: value.attributes.slug },
    };
  });

  // Blocking bertujuan return error jika path gak ada
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const selectedAccount = await getSelectedAccount(params.slug);
  //   console.log(params);
  return {
    props: {
      data: selectedAccount.data.data[0],
    },
    revalidate: 10,
  };
}
