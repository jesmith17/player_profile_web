import { Academics } from "./academics";
import { Athletics } from "./athletics";
import { Highlight } from "./highlight";
import { SocialMedia } from "./social-media";

export interface Profile {

    id: string;
    firstName: string;
    lastName: string;
    height: string;
    weight: number;
    academics: Academics;
    athletics: Athletics;
    email: string;
    picUrl: string;
    phone: string;
    ncaaId: string;
    jersey: number;
    position: string[];
    bio: string;
    links: string[];
    social_media: SocialMedia[];
    highlights: Highlight[];
    
    
}
