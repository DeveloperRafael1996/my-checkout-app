import SuccessMobile from "../components/success";
import { getTransactionData } from "../actions/save-transaction-data.action";

export default async function SuccessPage() {
  const transactionData = await getTransactionData();

  if (!transactionData) {
    throw new Error("Transaction data not found");
  }

  return (
    <div>
      <SuccessMobile {...transactionData} />
    </div>
  );
}
