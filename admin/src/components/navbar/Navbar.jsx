import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";


const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState(""); // add state for search term
  const { dispatch } = useContext(DarkModeContext);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            
            Mobried
          </div>
          <div className="item">
            
          </div>
          <div className="item">
            
          </div>
        </div>
      </div>
    </div>
  );
};                        

export default Navbar;
