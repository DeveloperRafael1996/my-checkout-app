import { getBodyInformation } from "../actions/body-information.action";
import { getTransactionError } from "../actions/save-transaction-data.action";
import { ErrorInformation } from "../components/error-information";

export default async function ErrorPage() {
  const { data } = await getTransactionError();

  const { purchaseNumber } = await getBodyInformation();

  return (
    <ErrorInformation
      errorInformation={data.STATUS}
      purchaseNumber={purchaseNumber.toString()}
    />
  );
}
