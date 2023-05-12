
type province = "Baghdad" | "Mosul" | "Basrah" | "Nasiriyah" | "Babil" | "Suleymaniyah" | "Erbil" | "Ramadi" | "Diyala" | "Kirkuk" | "Tikrit" | "Najaf" | "Kut" | "Dohuk" | "Diwaniyah" | "Karbala" | "Maysan" | "Muthanna";

type adminTypes = "Admin" | "Data Entery" | "Accounter" | "Human Resources" | "Support" | "Store Keeper";

type employerTypes = "chef" | "Data Entery" | "Accounter" | "Human Resources" | "Support" | "Store Keeper" | "Developer" | "Driver" | "Sales Representative" | "Sanitation Worker";

type weekDays = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

type genders = "Male" | "Female";

type userTypes = "Bronze" | "silver" | "Gold" | "Platinum";

type userStatus = "Active" | "Disabled" | "Deleted" | "Suspended";

type orderStatus = "Pending" | "Accepted" | "InProgress" | "InDelivery" | "Completed" | "Rejected" | "Deleted" | "Canceled";

type orderTypes = "Auto" | "Manual";

type issueTypes = "TechnicalProblem" | "Report" | "Suggestion" | "Orders" | "Account" | "Help" | "Others";

type publicStatus = "Active" | "Disabled";

type mealStatus = "Active" | "Disabled" | "Deleted" | "hidden";

type notificationsTypes = "Public" | "Private" | "Vertual";

type notificationsStatus = "Unread" | "Read";

type storeOrdersStatus = "Pending" | "Accepted" | "InDelivery" | "Completed" | "Canceled" | "Rejected" | "Deleted";

type ratingOrderStatus = "Ignored" | "None" | "Rated";

type discountTypes = "Price" | "Percent";

type promoCodeTypes = "Price" | "Percent";

type advertisementsTypes = "Restaurant" | "Meal" | null;

type paymentMethodsType = "Cash" | "Wallet" | "Points";

export{
    adminTypes,
    employerTypes,
    userTypes,
    province,
    weekDays,
    genders,
    userStatus,
    orderStatus,
    publicStatus,
    orderTypes,
    issueTypes,
    notificationsTypes,
    notificationsStatus,
    storeOrdersStatus,
    ratingOrderStatus,
    discountTypes,
    advertisementsTypes,
    paymentMethodsType,
    promoCodeTypes,
    mealStatus
}