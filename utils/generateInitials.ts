export function getInitials(name: string | null | undefined): string {
    if(name){
    const nameParts = name.trim().split(/\s+/).filter(Boolean);
    const initials = nameParts.map(part => part.charAt(0).toUpperCase());
    return initials.join("");
    }else {
        return "CN";
    }
  }