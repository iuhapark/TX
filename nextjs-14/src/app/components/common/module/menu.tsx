
import "@/app/styles.css";
import { useState, useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";
import { Menu } from "@/app/atoms/menu/Menu";
import { MenuBar } from "@/app/atoms/toggle/MenuBar";


function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const menuAnimations = isOpen
      ? [
          [
            "nav",
            { transform: "translateX(0%)" },
            { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 }
          ],
          [
            "li",
            { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
            { delay: stagger(0.05), at: "-0.1" }
          ]
        ]
      : [
          [
            "li",
            { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
            { delay: stagger(0.05, { from: "last" }), at: "<" }
          ],
          ["nav", { transform: "translateX(-100%)" }, { at: "-0.1" }]
        ];

    animate([
      [
        "path.top",
        { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
        { at: "<" }
      ],
      ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
      [
        "path.bottom",
        { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
        { at: "<" }
      ],
      // ...menuAnimations
    ]);
    
    if (isOpen) {
      document.body.style.paddingLeft = "220px";
    } else {
      document.body.style.paddingLeft = "0";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.paddingLeft = "0";
    };
  }, [isOpen]);

  return scope;
}


export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);

  return (
    <div>
    <div ref={scope}>
      <Menu />
      <MenuBar bar={() => setIsOpen(!isOpen)} />
    </div>
    </div>
  );
}