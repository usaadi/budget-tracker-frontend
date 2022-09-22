import { useEffect, useState } from "react";

import XButton from "../../shared/components/buttons/XButton";

import useUserSettimgs from "../../../api/userSettings/useUserSettings";
import usePatchUserSettings from "../../../api/userSettings/usePatchUserSettings";
import ControlledInput from "../../../lib/components/input/ControlledInput";

const SettingsPage = () => {
  const [currencySymbol, setCurrencySymbol] = useState("");

  const userSettingsInfo = useUserSettimgs();
  const userSettings = userSettingsInfo?.data?.data;

  useEffect(() => {
    if (userSettings) {
      setCurrencySymbol(userSettings.currencySymbol);
    }
  }, [userSettings]);

  const patchUserSettingsMutation = usePatchUserSettings();

  const updateCurrencySymbol = async () => {
    await patchUserSettingsMutation.mutateAsync({
      currencySymbol,
    });
  };

  return (
    <div className="lg:tw-w-50pct">
      <div className="tw-grid md:tw-grid-cols-2">
        <div>
          <span>Currency Symbol :</span>
        </div>
        <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-2">
          <ControlledInput
            className="tw-flex-grow"
            value={currencySymbol}
            maxLength={8}
            onChange={(value) => setCurrencySymbol(value)}
          />
          <XButton className="" onClick={updateCurrencySymbol}>
            Update
          </XButton>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
