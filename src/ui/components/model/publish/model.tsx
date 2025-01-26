"use client"

import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useCurrentEditor } from "@tiptap/react";
import ShareIcon from "@mui/icons-material/Share";
import { MultipleAutoComplete } from "@/ui/components/autocomplete/multipleAutoComplete";
import { CreateBlog, validateURL } from "@/lib/utilis";
import { ShareBody } from "../share";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));



export function Publish({ title, settitle }: {title: string, settitle:(a:string)=>void}) {
  const [value, setValue] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [autocompleteelement, setautocompleteelement] = React.useState([]);
  const [shareUrl, setShareUrl] = React.useState(window.location.origin);
  const [opensharepage, setopensharepage] = React.useState(false);
  const { editor } = useCurrentEditor();
  const [desc, setdesc] = React.useState("");
  const [url, seturl] = React.useState("");
  const [errors, setErrors] = React.useState<any>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validateForm = () => {
    const newErrors: any = {};
    if (!title.trim()) newErrors.title = "Title is required";
    
    const urlValidation = validateURL(url);
    if (urlValidation !== "valid") newErrors.url = urlValidation;
    
    if (!desc.trim()) newErrors.desc = "Description is required";
    if (value.length === 0) newErrors.tags = "At least one tag is required";
    if (!editor?.getHTML()) newErrors.content = "Content is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitblog = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const content = editor?.getHTML();
      const result = await CreateBlog(content, title, url, desc, value);
      console.log(result);
      if(result.message=="success"){
      const response = await fetch("/api/tags/set_tags", {
        method: "POST",
        body: JSON.stringify({
          blogid: result.data[0].id,
          tags: value,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) throw new Error('Failed to set tags');
      
      setShareUrl(`${shareUrl}/blogs/${url}`);
      setopensharepage(true);
    }else{
      console.log('Failed to set')
      setErrors({ ...errors, url: "Url already existes" })
    }
    } catch (error) {
      console.error("Error publishing blog:", error);
      setErrors({ submit: "Failed to publish blog. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    seturl(newUrl);
    const urlValidation = validateURL(newUrl);
    setErrors({ ...errors, url: urlValidation !== "valid" ? urlValidation : "" });
  };

  React.useEffect(() => {
    fetch("/api/tags/get_tags", {
      next: { revalidate: 3600 },
      cache: "force-cache",
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => setautocompleteelement(data.data))
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        sx={{
          backgroundColor: "skyblue",
          padding: "5px 10px",
          color: "black",
          borderRadius: "20px",
          border: "none",
          textTransform: "none",
          fontSize: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => setOpen(true)}
      >
        <ShareIcon
          sx={{
            fontSize: {
              xs: "10px",
              sm: "12px",
              md: "13px",
              lg: "14px",
            },
          }}
        />
        <div className="ml-2 xl:text-[12px] md:text-[11px] sm:text-[11px]">
          Publish
        </div>
      </Button>

      {!opensharepage ? (
        <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Publish the document
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <form onSubmit={handleSubmitblog}>
            <DialogContent
              dividers
              sx={{
                width: {
                  xs: "350px",
                  sm: "500px",
                },
                height: "auto",
              }}
            >
              <div className="space-y-4">
                <div>
                  <Typography>Enter the title of your web page</Typography>
                  <input
                    required
                    placeholder="Enter the title"
                    className={`p-2 w-full rounded-[5px] border-1 mt-2 focus:outline-blue-500 ${
                      errors && errors.title ? 'border-red-500' : ''
                    }`}
                    value={title}
                    onChange={(e) => {
                      settitle(e.target.value);
                      setErrors({ ...errors, title: '' });
                    }}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <Typography>Enter the url for your web page</Typography>
                  <div className="flex items-center space-x-1">
                  
                    <input
                      required
                      placeholder="enter-url-slug"
                      className={`p-2 w-full rounded-[5px] border-1 mt-2 focus:outline-blue-500 ${
                     ''
                      }`}
                      value={url}
                      onChange={handleUrlChange}
                    />
                  </div>
                  {errors.url && (
                    <p className="text-red-500 text-sm mt-1 ml-1">{errors.url}</p>
                  )}
                
                </div>

                <div>
                  <Typography>Enter the tags of your web page</Typography>
                  <MultipleAutoComplete
                    title={"Enter tags"}
                    islabel={false}
                    autocompleteelement={autocompleteelement}
                    value={value}
                    setValue={(newValue: any) => {
                      setValue(newValue);
                      setErrors({ ...errors, tags: '' });
                    }}
                  />
                  {errors.tags && (
                    <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
                  )}
                </div>

                <div>
                  <Typography>Enter the description of your web page</Typography>
                  <input
                    required
                    placeholder="Enter the description"
                    className={`p-2 w-full rounded-[5px] border-1 mt-2 focus:outline-blue-500 ${
                      errors.desc ? 'border-red-500' : ''
                    }`}
                    value={desc}
                    onChange={(e) => {
                      setdesc(e.target.value);
                      setErrors({ ...errors, desc: '' });
                    }}
                  />
                  {errors.desc && (
                    <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
                  )}
                </div>

                {errors.submit && (
                  <p className="text-red-500 text-sm mt-1">{errors.submit}</p>
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                disabled={isSubmitting}
                sx={{
                  backgroundColor: "blue",
                  padding: "8px 12px",
                  margin: "5px 0",
                  color: "#ffffff",
                  fontWeight: "500",
                  border: "none",
                  borderRadius: "12px",
                  '&:disabled': {
                    backgroundColor: 'gray',
                    cursor: 'not-allowed'
                  }
                }}
              >
                {isSubmitting ? 'Publishing...' : 'Confirm Publish'}
              </Button>
            </DialogActions>
          </form>
        </BootstrapDialog>
      ) : (
        <ShareBody
          open={open}
          setOpen={setOpen}
          shareUrl={shareUrl}
          setopensharepage={setopensharepage}
        />
      )}
    </React.Fragment>
  );
}