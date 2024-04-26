import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSetSearchParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (key: string, value: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (value === null) newSearchParams.delete(key);
    else newSearchParams.set(key, value);
    return router.push(
      `${pathname}?${newSearchParams.toString()}` as Parameters<
        typeof router.push
      >[0],
      { shallow: true },
    );
  };
};
