import React from 'react';
//import { TFunction } from "i18next"
import { useTranslation } from "react-i18next"


export default function Dashboard() {
    const { t } = useTranslation()
    return ( <div>
            
        <h1>Dashboard</h1>
        <button>{t("Create course")}</button>
        <button>{t("Create card")}</button>
    </div> );
}
/* class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
   
    render() { 
         
        return ( <div>
            
            <h1>Dashboard</h1>
            <button>{useTranslation("Create course")}</button>
            <button>Create card</button>
        </div> );
    }
}
 
export default Dashboard; */