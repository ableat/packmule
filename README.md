<h1 align="center">
  pack mule
  <br>
</h1>

<h4 align="center">Simple wrapper fo creating <a href="https://aws.amazon.com/efs/">elastic file-systems</a> on AWS.</h4>

<br>

We created this project since one of our build processes requires +80GB of storage. Popular docker-based CI tools (i.e. travis, shippable) have limited space, hence we had to get creative. Packmule creates a file storage on AWS that can then be mounted remotely on the CI instance via NFS. 
