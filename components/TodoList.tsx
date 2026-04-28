import { useEffect, useRef, useState } from 'react';

const fakeFetch = (query: string) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve([`${query}-1`, `${query}-2`, `${query}-3`]);
    }, Math.random() * 1000);
  });

export default function TodoList() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string[]>([]);

  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debouncedSearch = (value: string) => {
    if (timerId.current) clearTimeout(timerId.current);

    setLoading(true);
    timerId.current = setTimeout(() => {
      setQuery(value);
    }, 300);
  };

  useEffect(() => {
    let isActual = true;

    const asyncFunction = async () => {
      const fetchRes = (await fakeFetch(query)) as unknown as string[];
      if (isActual) {
        setResult(fetchRes);
      }
      setLoading(false);
    };
    asyncFunction();

    return () => {
      isActual = false;
    };
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter username"
        onChange={e => debouncedSearch(e.target.value)}
      />
      {loading && <p>Loading, please wait...</p>}
      {result && result.map(res => <li key={res}>{res}</li>)}
    </div>
  );
}
