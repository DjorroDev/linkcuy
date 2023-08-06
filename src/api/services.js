import api from ".";

const ENDPOINT = {
  ACCOUNT: "/accounts",
  LINK: "/links",
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

// Plural yak soalnya pas diselect pasti dapetnya lebih dari satu
const getSelectedLinksByAccount = async (slug) => {
  try {
    const selectedLinks = await api.get(
      `${ENDPOINT.LINK}?filters[account][slug][$eqi]=${slug}&populate=*`
    );
    // console.log(selectedLink);
    return selectedLinks;
  } catch (err) {
    throw Error(err);
  }
};

export { getAllAccounts, getSelectedAccount, getSelectedLinksByAccount };
