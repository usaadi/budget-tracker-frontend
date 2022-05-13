import AppLayout from "../../shared/AppLayout";
import IncomeExpensesSwitch from "../../shared/components/IncomeExpensesSwitch";

const SummaryPage = () => {
  return (
    <AppLayout>
      <div className="tw-flex tw-flex-col">
        <div className="tw-flex">
          <IncomeExpensesSwitch />
        </div>
      </div>
    </AppLayout>
  );
};

export default SummaryPage;
