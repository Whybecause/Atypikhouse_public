import useSWR from "swr";

const fetchAccounts = async (url: string) => {
  return fetch(url).then((response) => response.json());
};

interface IGoogle {
  isGoogle: boolean
}

const UseIsGoogle = (userId: number): IGoogle => {
  const { data } = useSWR("/api/protected/account", fetchAccounts);
  const { accounts } = data || [];
  const isGoogle = accounts?.some(i => i.userId === userId);

  return { isGoogle };

};
export default UseIsGoogle;
