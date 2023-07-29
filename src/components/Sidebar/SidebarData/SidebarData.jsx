import * as FaIcon from "react-icons/fa";
import * as BsIcon from "react-icons/bs";

const style = { color: "var(--black-purple)"};

export const SidebarData =  [
  {
    title: 'Home',
    path: '/homepage',
    icon: <FaIcon.FaClinicMedical style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Patient Registration',
    path: '/patientregistration',
    icon: <BsIcon.BsFillPersonVcardFill style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Query Registration',
    path: '/queryregistration',
    icon: <FaIcon.FaNotesMedical style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Exam Registration',
    path: '/examregistration',
    icon: <FaIcon.FaFileMedicalAlt style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Medical Record List',
    path: '/medicalrecordlist',
    icon: <FaIcon.FaBookMedical style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Patient Record',
    path: '/patientrecord',
    icon: <BsIcon.BsFillFileEarmarkPersonFill style={style}/>,
    cName: 'nav-text',
  },
]
