'use client';

import { Button, Card, CardBody, cn } from '@nextui-org/react';
import React from 'react';
import { LinkedinIcon } from "react-share";

import {FaGithub } from 'react-icons/fa';
/**
 * Interface for Code Evaluation component props
 * @interface codeEvalutionProps
 */
export interface codeEvalutionProps {
	/** Description text for the evaluation */
	description?: string;
	/** Title of the evaluation */

	/** Maximum characters to show before truncating (default: 300) */
	charLimit?: number;

}

/**
 * CodeEvalution Component
 * Displays a card with evaluation details, including title, description,
 * and attempt tracking. Supports expandable description with "See More/Less"
 * functionality.
 *
 * @param {codeEvalutionProps} props - Component properties
 */
export function CardAbout(props: codeEvalutionProps) {
	// Destructure props with default values
	const {
		description = 'A personal blogging platform built with Next.js, Tailwind CSS, and TypeScript.Share your thoughts and connect with readers.',
		charLimit = 300,
	
	} = props;

	// State to track if description is expanded
	const [isExpanded, setIsExpanded] = React.useState(false);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		
		  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* About Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About this Project</h3>
                <p className="text-gray-600 mb-4">
             {isExpanded
							? description
							: `${description?.slice(0, charLimit)}...`}

						{description.length > charLimit && (
							<Button
								disableAnimation
								onPress={toggleExpand}
								className={cn(
									'text-content1-200 text-sm text-content1-200   font-semibold bg-content1 ',
									{ 'ml-1': isExpanded },
								)}
							>
								{isExpanded ? ' See Less' : 'See More'}
							</Button>
						)}
                </p>
                <div className="flex space-x-4">
                  <a target="__blank" href="https://github.com/Navani001" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">GitHub</span>
                    <FaGithub  size={30}/>
                  </a>
                  <a target="__blank" href="https://www.linkedin.com/in/navani-hk/" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">LinkedIn</span>
                   <LinkedinIcon size={30} style={{borderRadius:"5px"}}/>
                  </a>
                </div>
              </div>
        
              {/* Contact Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
                <p className="text-gray-600 mb-2">Have questions or suggestions?</p>
                <a 
                  href="mailto:navaneetha2006krishnan@gmail.com"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                 navaneetha2006krishnan@gmail.com
                </a>
              </div>
            </div>
        
            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} All rights reserved
              </p>
            </div>
          </div>
		
	);
}
