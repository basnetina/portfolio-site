import ProjectComponent from "@/components/pages/projects/ProjectComponent";
import SkillsComponents from "@/components/pages/skills/SkillsComponents";
import "../../styles/hexSkills.css"
import ContactComponent from "@/components/pages/contact/ContactComponent";
import LandingComponent from "@/components/pages/home/LandingComponent";
import {EducationComponent} from "@/components/pages/education/EducationComponent";

export default function Home() {

    return (
        <div className={'flex items-center flex-col justify-center'}>
            {/*section  for landing section */}
            <LandingComponent />

            <ProjectComponent/>
            <SkillsComponents />
            <EducationComponent />

            <ContactComponent />

        </div>
    );
}
