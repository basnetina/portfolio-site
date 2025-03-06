const AboutMe = (
    {
        about
    }: {
        about: string
    }
) => {
    return (
        <>
            <h3 className={'text-2xl'}>About</h3>
            <p className={'text-lg text-gray-600 dark:text-gray-300 text-justify'}>
                {about || `Full Stack Developer with industry experience building websites, web applications and
                mobile
                application specialized in JavaScript, python and have professional experience working
                with
                React, NEXT, Django and Node.js framework. The database skill includes MongoDB, SQLite,
                MS
                SQL, MySQL, Firebase, Oracle. Aspiring to learn and master MERN Stack, and many new
                things.`}
            </p>
        </>
    )
}

export default AboutMe;