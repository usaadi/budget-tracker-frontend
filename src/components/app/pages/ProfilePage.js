import useProfile from "../../../api/profile/useProfile";

const ProfilePage = () => {
  const profileInfo = useProfile();
  const profile = profileInfo?.data?.data;

  return (
    <div className="lg:tw-w-50pct">
      <div className="tw-grid tw-grid-cols-2">
        <div>Email:</div>
        <div>{profile?.email}</div>
        <div>Name:</div>
        <div>{profile?.fullName}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
