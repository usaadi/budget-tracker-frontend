import useProfile from "../../../api/profile/useProfile";
import useIsDemoAccount from "../../shared/hooks/useIsDemoAccount";

const ProfilePage = () => {
  const profileInfo = useProfile();
  const profile = profileInfo?.data?.data;

  const isDemo = useIsDemoAccount();
  const email = isDemo ? "Demo" : profile?.email;
  const fullName = isDemo ? "Demo" : profile?.fullName;

  return (
    <div className="lg:tw-w-50pct">
      <div className="tw-grid md:tw-grid-cols-2">
        <div>Email:</div>
        <div>{email}</div>
        <div>Name:</div>
        <div>{fullName}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
