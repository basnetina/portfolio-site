export async function getServerProjects() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects?email=${process.env.NEXT_PUBLIC_MY_EMAIL}`,{
            next: {
                tags: ['projects']
            }
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }

}


export async function getSingleProject(id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`,{
            next: {
                tags: ['projects']
            }
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }

}