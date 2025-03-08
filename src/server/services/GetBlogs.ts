export async function getServerBlogs() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/server?email=${process.env.NEXT_PUBLIC_MY_EMAIL}`,{
            next: {
                tags: ['blogs'],
                revalidate: 60
            }
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }

}
