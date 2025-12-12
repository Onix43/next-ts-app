import Image from 'next/image';

async function getData() {
  const res = await fetch(
    'https://api.thecatapi.com/v1/images/search?limit=10',
    { cache: 'no-store' }
  );
  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <ul>
      {data.map(p => (
        <li key={p.id}>
          <Image
            src={p.url}
            alt=""
            width={300}
            height={300}
            sizes=""
            priority
          ></Image>
        </li>
      ))}
    </ul>
  );
}
