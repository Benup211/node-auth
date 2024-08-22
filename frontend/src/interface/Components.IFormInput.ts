import { LucideProps } from "lucide-react";
import React from "react";

export interface IFormInput extends React.HTMLProps<HTMLInputElement> {
    Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}