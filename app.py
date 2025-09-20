import streamlit as st
import google.generativeai as genai
from PIL import Image
import io
import base64

# Configure the API key
GEMINI_API_KEY = "AIzaSyDo2N-1K5Yf4RldYNBIFGQS2H7VnxKqkYA"
genai.configure(api_key=GEMINI_API_KEY)

# Initialize the model
model = genai.GenerativeModel('gemini-2.0-flash-exp')

def encode_image_to_base64(image):
    """Convert PIL image to base64 string"""
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    return img_str

def generate_crop_breed(image1, image2):
    """Generate a new crop breed description using Gemini"""
    
    prompt = """
    You are an agricultural AI specialist. I'm providing you with two crop images. 
    Based on the visual characteristics of these crops, please:
    
    1. Identify the crops in both images
    2. Analyze their key characteristics (size, color, shape, texture, etc.)
    3. Create a hypothetical new crop breed that combines the best features of both
    4. Provide the following details for your new breed:
       - Breed Name (creative and descriptive)
       - Physical Description
       - Growing Conditions
       - Nutritional Benefits
       - Harvest Time
       - Special Properties or Advantages
       - Growing Tips
    
    Please be creative but scientifically plausible in your descriptions.
    Format your response in a clear, organized manner.
    """
    
    try:
        # Convert images for Gemini
        response = model.generate_content([
            prompt,
            image1,
            image2
        ])
        
        return response.text
    except Exception as e:
        return f"Error generating breed description: {str(e)}"

def main():
    st.set_page_config(
        page_title="🌱 Crop Breed Generator",
        page_icon="🌱",
        layout="wide"
    )
    
    st.title("🌱 Crop Breed Generator")
    st.markdown("*Powered by Google Gemini 2.0 Flash*")
    
    st.markdown("""
    Upload two crop images and let AI generate a creative new crop breed concept 
    that combines the best characteristics of both!
    """)
    
    # Create two columns for image uploads
    col1, col2 = st.columns(2)
    
    with col1:
        st.header("🌾 First Crop")
        uploaded_file1 = st.file_uploader(
            "Choose first crop image", 
            type=['png', 'jpg', 'jpeg'],
            key="crop1"
        )
        
        if uploaded_file1 is not None:
            image1 = Image.open(uploaded_file1)
            st.image(image1, caption="First Crop", use_column_width=True)
    
    with col2:
        st.header("🌽 Second Crop")
        uploaded_file2 = st.file_uploader(
            "Choose second crop image", 
            type=['png', 'jpg', 'jpeg'],
            key="crop2"
        )
        
        if uploaded_file2 is not None:
            image2 = Image.open(uploaded_file2)
            st.image(image2, caption="Second Crop", use_column_width=True)
    
    # Generate button
    if uploaded_file1 is not None and uploaded_file2 is not None:
        if st.button("🔬 Generate New Breed", type="primary", use_container_width=True):
            with st.spinner("Analyzing crops and generating new breed..."):
                # Load images
                image1 = Image.open(uploaded_file1)
                image2 = Image.open(uploaded_file2)
                
                # Generate the breed description
                result = generate_crop_breed(image1, image2)
                
                # Display results
                st.markdown("---")
                st.header("🎉 Your New Crop Breed!")
                
                # Create an expander for the results
                with st.expander("View Breed Details", expanded=True):
                    st.markdown(result)
                
                # Add download button for the results
                st.download_button(
                    label="📄 Download Breed Description",
                    data=result,
                    file_name="new_crop_breed.txt",
                    mime="text/plain"
                )
    
    else:
        st.info("Please upload both crop images to generate a new breed.")
    
    # Sidebar with information
    with st.sidebar:
        st.header("ℹ️ About")
        st.markdown("""
        This app uses Google's Gemini 2.0 Flash AI to analyze crop images and 
        generate creative new breed concepts with visual representations.
        
        **How it works:**
        1. Upload two crop images
        2. AI analyzes visual characteristics
        3. Generates a hypothetical new breed description
        4. Creates an image prompt for the new breed
        5. Provides detailed breed information
        
        **Features:**
        - Detailed breed descriptions
        - AI-generated image prompts
        - Downloadable results
        
        **Note:** This is for creative/educational purposes only. 
        Real crop breeding involves complex genetics and extensive testing.
        """)
        
        st.header("🔧 Tips")
        st.markdown("""
        - Use clear, well-lit crop images
        - Images of mature crops work best
        - Try different combinations for variety
        - Save interesting results!
        """)

if __name__ == "__main__":
    main()