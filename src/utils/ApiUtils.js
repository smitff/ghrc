// const serverurl = "http://awarepedia786-001-site1.htempurl.com/api/";
// const imageurl = "http://awarepedia786-001-site1.htempurl.com/Images/";

const serverurl = "http://global-app.in//api/";
const imageurl = "http://global-app.in/Images/";
export const ApiUtils = {
    News:`${serverurl}News.aspx`,
    NewsAll:`${serverurl}AllNews.aspx`,
    Doctorsfull:`${serverurl}Doctor.aspx?isfull=1`,
    Doctors:`${serverurl}Doctor.aspx?isfull=0`,
    HealthTps:`${serverurl}HealthTips.aspx`,
    HealthTpsAll:`${serverurl}AllHealthTips.aspx`,
    VirtualTour:`${serverurl}VirtualTour.aspx`,
    Top:`${serverurl}Top.aspx`,
    Aboutus:`${serverurl}HospitalInfo.aspx`,
    Governance:`${serverurl}Governance.aspx`,
    Query:`${serverurl}Query.aspx`,
    // Donationurl:`https://pages.razorpay.com/pl_HsYrMTZUoJPyKg/view`,
    Donationurl:`http://global-app.in/razor.aspx`,
    
}

export const ImageService = {
    news:`${imageurl}News/`,
    doctor:`${imageurl}Doctor/`,
    Governance:`${imageurl}Governance/`,
    health:`${imageurl}HealthTips/`,
    Donate:`${imageurl}Donate/`,
    Hospital:`${imageurl}HospitalInfo/`,
    Top:`${imageurl}Top/`,
    Thumbnail:`${imageurl}Thumbnail/`,
}