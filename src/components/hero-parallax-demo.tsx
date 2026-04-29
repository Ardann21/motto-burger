"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

export const products = [
  {
    title: "Signature Wagyu",
    link: "#",
    thumbnail: "https://foodish-api.com/images/burger/burger1.jpg",
  },
  {
    title: "Smoked Marrow",
    link: "#",
    thumbnail: "https://foodish-api.com/images/burger/burger2.jpg",
  },
  {
    title: "Truffle Emulsion",
    link: "#",
    thumbnail: "https://foodish-api.com/images/burger/burger3.jpg",
  },
  {
    title: "Black Oak Brioche",
    link: "#",
    thumbnail: "https://foodish-api.com/images/burger/burger4.jpg",
  },
  {
    title: "Heritage Blend",
    link: "#",
    thumbnail: "https://foodish-api.com/images/burger/burger5.jpg",
  },
  {
    title: "Gold Finished",
    link: "#",
    thumbnail: "https://foodish-api.com/images/burger/burger6.jpg",
  },
  {
    title: "The Workshop",
    link: "#",
    thumbnail: "https://foodish-api.com/images/burger/burger7.jpg",
  },
  {
    title: "Aged Comté",
    link: "#",
    thumbnail: "https://foodish-api.com/images/burger/burger8.jpg",
  },
  {
    title: "Umami Crisp",
    link: "#",
    thumbnail: "https://foodish-api.com/images/burger/burger9.jpg",
  },
  {
    title: "Motto Reserve",
    link: "#",
    thumbnail: "https://foodish-api.com/images/burger/burger10.jpg",
  },
  {
    title: "Archives NYC",
    link: "#",
    thumbnail: "https://foodish-api.com/images/burger/burger11.jpg",
  },
  {
    title: "Archives London",
    link: "#",
    thumbnail: "https://foodish-api.com/images/burger/burger12.jpg",
  },
  {
    title: "Archives Tokyo",
    link: "#",
    thumbnail: "https://foodish-api.com/images/burger/burger13.jpg",
  },
  {
    title: "Precision Cut",
    link: "#",
    thumbnail: "https://foodish-api.com/images/burger/burger14.jpg",
  },
  {
    title: "The Assembly",
    link: "#",
    thumbnail: "https://foodish-api.com/images/burger/burger15.jpg",
  },
];

export default function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
