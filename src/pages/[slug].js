import { getAllAccounts, getSelectedAccount, getSelectedLinksByAccount } from "@/api/services";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function SlugPage({ data, links }) {
  //   console.log(links.data);
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
        {links.data.map((value, index) => {
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
              className={`flex gap-2 items-center h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[24px] p-4 hover:scale-105 transition-all ${statusClass}`}
            >
              <div className="relative w-[36px] h-[36px] rounded-full overflow-hidden">
                <Image
                  className="relative"
                  layout="fill"
                  objectFit="cover"
                  src={`${process.env.NEXT_PUBLIC_ASSET_URL}${value.attributes.icon.data.attributes.url}`}
                  alt={data.attributes.fullname}
                ></Image>
              </div>
              {value.attributes.title}
            </div>
          ) : (
            <a
              key={index}
              className={`flex items-center gap-2 h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[24px] p-4 hover:scale-105 transition-all ${statusClass}`}
              href={value.attributes.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative w-[36px] h-[36px] rounded-full overflow-hidden">
                <Image
                  className="relative"
                  layout="fill"
                  objectFit="cover"
                  src={`${process.env.NEXT_PUBLIC_ASSET_URL}${value.attributes.icon.data.attributes.url}`}
                  alt={data.attributes.fullname}
                ></Image>
              </div>
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
  const links = await getSelectedLinksByAccount(params.slug);
  //   console.log(icon.data);

  return {
    props: {
      data: selectedAccount.data.data[0],
      links: links.data,
    },
    revalidate: 10,
  };
}
