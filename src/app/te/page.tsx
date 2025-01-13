import BasicPopover from "@/lib/popover";
import { Button } from "@nextui-org/button";
import SmartToyIcon from "@mui/icons-material/SmartToy";
export default async function Home() {
  return <div className="min-h-screen  bg-gray-50 flex justify-center items-center">
<div className="gap-2 flex">
    <Button className="bg-black min-w-0 h-auto text-white rounded-[20px] gap-1 px-[0.5rem]"> <SmartToyIcon
                sx={{
                  fontSize: {
                    xs: "10px",
                    sm: "14px",
                    md: "14px",
                    lg: "13px",
                  },
                  margin: "0 8px 0 0",
                }}
              /> Ai</Button>
    <BasicPopover
            title="AI"
            titlestyle={{
              fontSize: {
                xs: "10px",
                sm: "12px",
                md: "12px",
                lg: "13px",
              },

              padding: "5px 10px",
            }}
            icon={
              <SmartToyIcon
                sx={{
                  fontSize: {
                    xs: "10px",
                    sm: "14px",
                    md: "14px",
                    lg: "13px",
                  },
                  margin: "0 8px 0 0",
                }}
              />
            }
            body={
              <div className=" p-1 bg-white rounded-lg shadow-lg lg:p-2 sm:p-2">
                \
              </div>
            }
          />
</div>

  </div>;
}
