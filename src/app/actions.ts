'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateLanding() {
    revalidateTag('landing');
}

export async function revalidateSocial() {
    revalidateTag('social');
}

export async function revalidateSkills() {
    revalidateTag('skills');
}

export async function revalidateProjects() {
    revalidateTag('projects');
}

export async function revalidateEducation() {
    revalidateTag('education');
}