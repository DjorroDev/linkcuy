import api from ".";

const ENDPOINT = {
  ACCOUNT: "/accounts",
};

const getAllAccounts = async () => {
  try {
    const accounts = await api.get(ENDPOINT.ACCOUNT);
    // console.log(accounts);
    return accounts;
  } catch (err) {
    throw Error(err);
  }
};

const getSelectedAccount = async (slug) => {
  try {
    const selectedAccount = await api.get(
      `${ENDPOINT.ACCOUNT}?filters[slug][$eqi]=${slug}&populate=*`
    );
    // console.log(selectedAccount);
    return selectedAccount;
  } catch (err) {
    throw Error(err);
  }
};

export { getAllAccounts, getSelectedAccount };
